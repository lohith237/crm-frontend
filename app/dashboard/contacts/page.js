"use client";

import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "../../components/Button";
import Modal from "../../components/Modal";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { Input } from "../../components";
import FormParser from "../../components/FormParser";
import Masters from "../../components/Masters.json";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";
import { getData, deleteData, saveOrUpdateData } from "./UsersApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Contacts() {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, rowsPerPage, searchText],
    queryFn: () =>
      getData({
        page: currentPage,
        pageSize: rowsPerPage,
        search: searchText,
      }),
    keepPreviousData: true,
  });

 const saveMutation = useMutation({
  mutationFn: (formData) => saveOrUpdateData(formData),
  onSuccess: () => {
    queryClient.invalidateQueries(["users"]); 
    setModalMessage("Contact saved successfully");
    setSuccessModalOpen(true);
    closeModal();
  },
  onError: (error) => {
    setModalMessage(
      error?.response?.data?.message || "Failed to save contact"
    );
    setErrorModalOpen(true);
  },
});


  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setModalMessage("Contact deleted successfully");
      setSuccessModalOpen(true);
    },
    onError: () => {
      setModalMessage("Failed to delete contact");
      setErrorModalOpen(true);
    },
  });

  const openModal = (contact = null) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleFormSubmit = (formData) => {
    saveMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this contact?")) {
      deleteMutation.mutate(id);
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      Lead: "bg-yellow-100 text-yellow-700",
      Prospect: "bg-blue-100 text-blue-700",
      Customer: "bg-green-100 text-green-700",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phoneNumber, sortable: true },
    { name: "Company", selector: (row) => row.company, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => <StatusBadge status={row.status} />,
      sortable: true,
    },
    { name: "Notes", selector: (row) => row.notes },
    { name: "Created", selector: (row) => row.createdAt, sortable: true },
    { name: "Updated", selector: (row) => row.updatedAt, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openModal(row)} className="text-blue-500">
            <EditIcon />
          </button>
          <button onClick={() => handleDelete(row._id)} className="text-red-500">
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headCells: { style: { fontWeight: "bold", fontSize: "14px" } },
    cells: { style: { fontSize: "13px" } },
  };

  return (
    <div>
      <Input
        placeholder="Search contacts..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1);
        }}
        className="!w-56 mb-4"
      />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contacts (Total: {data?.count || 0})
        </h1>
        <Button onClick={() => openModal()}>Add Contact</Button>
      </div>
      <DataTable
        columns={columns}
        data={data?.results || []}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={customStyles}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        progressPending={isLoading}
        progressComponent={<div>Loading...</div>}
        paginationServer
        paginationTotalRows={data?.count || 0}
        paginationPerPage={rowsPerPage}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(newPerPage, page) => {
          setRowsPerPage(newPerPage);
          setCurrentPage(page);
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedContact ? "Edit Contact" : "Add Contact"}
      >
        <FormParser
          modelObject={Masters.Contacts}
          formData={selectedContact}
          formSubmit={handleFormSubmit}
        />
      </Modal>
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={modalMessage}
      />
      <ErrorModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
