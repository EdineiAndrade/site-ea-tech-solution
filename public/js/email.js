// Configurações (substitua com seus valores)
const FORM_SUBMIT_URL = "https://formsubmit.co/60ec14abcd09e2d5735db04f9d3b313f";
const THANK_YOU_PAGE = "https://seusite.com/thanks.html";

document.getElementById("form-orcamento").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Adiciona campos ocultos dinamicamente
    const form = e.target;
    form.action = FORM_SUBMIT_URL;
    form.method = "POST";

    const nextInput = document.createElement("input");
    nextInput.type = "hidden";
    nextInput.name = "_next";
    nextInput.value = THANK_YOU_PAGE;
    form.appendChild(nextInput);

    const captchaInput = document.createElement("input");
    captchaInput.type = "hidden";
    captchaInput.name = "_captcha";
    captchaInput.value = "false";
    form.appendChild(captchaInput);

    // Envia o formulário
    form.submit();
});