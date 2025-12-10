"use client";
import React, { useState } from "react";
import { Icon } from "../icons/Icon";
import { Label } from "./Label";
import { Input } from "./InputField";
import { EyeCloseIcon, EyeIcon } from "../icons";
import { Checkbox } from "./Checkbox";
import { Button } from "../components/Button"
function Logintemplate({ handleChange, handleLogin, loading, error }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex w-full items-center justify-center min-h-screen px-2">
            <div className="flex flex-col items-start justify-center w-full max-w-md">
                <h1 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-2xl">
                    Sign In
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Enter your email and password to sign in!
                </p>

                <div className="w-full flex flex-col lg:flex-row gap-2">
                    <button className="btn-social lg:w-auto">
                        <Icon name="gmail" />
                        Sign in with Google
                    </button>
                    <button className="btn-social flex-1  lg:w-auto">
                        <Icon name="x" />
                        Sign in with X
                    </button>
                </div>
                <div className="relative py-3 w-full sm:py-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                            Or
                        </span>
                    </div>
                </div>
                <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
                    <div>
                        <Label>
                            Email:<span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            required={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>
                            Password <span className="text-red-500">*</span>{" "}
                        </Label>
                        <div className="relative">
                            <Input
                                id={"password"}
                                name={"password"}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required={true}
                                onChange={handleChange}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                            >
                                {showPassword ? (
                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                ) : (
                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <Checkbox label={"Keep me logged in"} />
                            <button type="button" className="text-[var(--color-primary)] text-sm font-medium">Forgot password?</button>
                        </div>
                        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                        <Button type="submit" loading={loading} className="text-[var(--color-primary)] text-sm font-medium !mt-1 w-full">Sign In</Button>
                        <div className="flex items-center justify-center gap-2 mt-5">
                            <Label className="!mb-0">Don&#39;t have an account?</Label>
                            <button type="button" className="text-[var(--color-primary)] text-sm font-medium">Sign Up?</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { Logintemplate };
