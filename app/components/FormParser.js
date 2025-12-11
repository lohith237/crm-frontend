"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./InputField";
import { Button } from "./Button";
import Image from "next/image";
import Select from "react-select";
import { FileUpload } from "./FileUpload";
import spinner from "../../assets/spinner.gif";

const defaultFieldToCol = (groupClass) => {
  if (!groupClass) return "w-full md:w-1/3";
  if (groupClass === "col-md-24") return "w-full";
  if (groupClass === "col-md-12") return "w-full md:w-1/2";
  if (groupClass === "col-md-8") return "w-full md:w-1/3";
  return "w-full md:w-1/3";
};

export default function FormParser({
  modelObject = {},
  formData = {},
  formSubmit,
  setReadOnly,
  readOnly = false,
}) {
  const [formValues, setFormValues] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const fieldObjectsRef = useRef([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false };
  }, []);

  const field_objects = [];
 if (modelObject?.orderBy && Array.isArray(modelObject.orderBy)) {
  modelObject.orderBy.forEach((order_field) => {
    (modelObject.fields || []).forEach((field_obj) => {
      if (field_obj.fieldName === order_field) {
        if (modelObject.layoutSpecificFieldClasses && modelObject.layoutSpecificFieldClasses[field_obj.fieldName]) {
          field_obj.groupClass = modelObject.layoutSpecificFieldClasses[field_obj.fieldName];
        } else if (modelObject.layoutClass) {
          field_obj.groupClass = modelObject.layoutClass;
        }
        field_objects.push(field_obj);
      }
    });
  });
} else {
  (modelObject.fields || []).forEach((field_obj) => {
    if (modelObject.layoutSpecificFieldClasses && modelObject.layoutSpecificFieldClasses[field_obj.fieldName]) {
      field_obj.groupClass = modelObject.layoutSpecificFieldClasses[field_obj.fieldName];
    } else if (modelObject.layoutClass) {
      field_obj.groupClass = modelObject.layoutClass;
    }
    field_objects.push(field_obj);
  });
}

  fieldObjectsRef.current = field_objects;
  useEffect(() => {
    const t = setTimeout(() => {
      if (mounted.current) setIsLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      setFormValues({});
      return;
    }
    setFormValues({ ...formData });
  }, [formData]);

  const handleFieldChange = (fieldName, value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const validateField = (fo, val) => {
    if (!fo) return null;
    if (fo.required) {
      const empty =
        val === undefined ||
        val === null ||
        val === "" ||
        (Array.isArray(val) && val.length === 0);
      if (empty) return `${fo.label || fo.fieldName} is required`;
    }
    if (fo.inputType === "email" && val) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(val)) return `Please enter a valid email`;
    }
    if (fo.max_length && typeof val === "string") {
      if (val.length > fo.max_length)
        return `${fo.label || fo.fieldName} max length is ${fo.max_length}`;
    }
    return null;
  };

  const validateAll = () => {
    const errs = {};
    for (const fo of field_objects) {
      if (fo.fieldType === "string") {
        const value = formValues[fo.fieldName];
        const err = validateField(fo, value);
        if (err) errs[fo.fieldName] = err;
      }
      if (fo.fieldType === "file") {
        if (fo.required && !formValues[fo.fieldName]) {
          errs[fo.fieldName] = `${fo.label || fo.fieldName} is required`;
        }
      }
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async () => {
    if (loading) return;
    if (!validateAll()) return;
    try {
      setLoading(true);
      if (typeof formSubmit === "function") {
        await formSubmit({ ...formValues }, setLoading);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  const renderField = (fo) => {
    const disabled = readOnly || fo?.is_always_read_only;
    const colClass = defaultFieldToCol(fo.groupClass);
    const err = fieldErrors[fo.fieldName];

    switch (fo.fieldType) {
      case "select":
        return (
          <div key={fo.fieldName} className={`${colClass} mb-4 px-3`}>
            <label className="block mb-1 font-medium text-sm">{fo.label}</label>
            <Select
              options={fo.options}
              value={fo.options.find(opt => opt.value === formValues[fo.fieldName]) || null}
              onChange={(sel) => handleFieldChange(fo.fieldName, sel?.value || "")}
              isDisabled={disabled}
              menuPortalTarget={typeof window !== "undefined" ? document.body : null}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (base) => ({ ...base, zIndex: 9999 })
              }}
            />
          </div>
        );
      case "string":
        return (
          <div key={fo.fieldName} className={`${colClass} mb-4 px-3`}>
            <label className="block mb-1 font-medium text-sm">{fo.label}</label>
            <Input
              type={fo.inputType || "text"}
              name={fo.fieldName}
              placeholder={fo.placeholder || ""}
              value={formValues[fo.fieldName] ?? ""}
              onChange={(e) => handleFieldChange(fo.fieldName, e.target.value)}
              disabled={disabled}
              maxLength={fo.max_length}
              error={Boolean(err)}
              hint={err || ""}
              required={fo.required}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={fo.fieldName} className={`${colClass} mb-4 px-3`}>
            <label className="block mb-1 font-medium text-sm">{fo.label}</label>
            <textarea
              name={fo.fieldName}
              placeholder={fo.placeholder || ""}
              value={formValues[fo.fieldName] ?? ""}
              onChange={(e) => handleFieldChange(fo.fieldName, e.target.value)}
              disabled={disabled}
              rows={4}
              className="h-auto w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 bg-transparent text-gray-800 border-gray-300 focus:outline-none focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-brand-800"
            />
            {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
          </div>
        );
      case "file":
        return (
          <div key={fo.fieldName} className={`${colClass} mb-4 px-3`}>
            <label className="block mb-1 font-medium text-sm">{fo.label}</label>
            <FileUpload
              onFileSelect={(file) => handleFieldChange(fo.fieldName, file)}
            />
            {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Image src={spinner} alt="Loading..." width={120} height={120} className="h-40 w-40" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap -mx-3">
        {field_objects.map((fo) => renderField(fo))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {readOnly ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (typeof setReadOnly === "function") setReadOnly(false);
            }}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button onClick={onSubmit} className="w-full" loading={loading}>Submit</Button>
          </>
        )}
      </div>
    </div>
  );
}
