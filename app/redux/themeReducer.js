const initialState = {
    mode: "light",
};

export  const themeReducer=(state=initialState, action)=> {
    switch (action.type) {
        case "TOGGLE_THEME":
            const newTheme = state.mode === "light" ? "dark" : "light";
            document.documentElement.classList.toggle("dark", newTheme === "dark");
            return { mode: newTheme };

            default:
                return state
    }

}