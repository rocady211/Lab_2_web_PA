const enter_assistant = document.getElementById("enter_assistant");

enter_assistant.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("jajajja");

    enter_assistant.classList.remove("w-50");
    enter_assistant.classList.add("w-25");
});
