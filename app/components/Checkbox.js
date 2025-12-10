import { Label } from "./Label";
export function Checkbox({ label, checked, onChange, name }) {
    return (
        <label className="inline-flex  gap-2 cursor-pointer">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border cursor-pointer appearance-none border-gray-400 
                  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] 
                  hover:border-[var(--color-primary)]"
            />
            <Label>{label}</Label>
        </label>
    );
}
