function isValidUSorCanadaPhone(phone) {
  // Accepts +1 (xxx) xxx-xxxx, +1 xxx-xxx-xxxx, (xxx) xxx-xxxx, xxx-xxx-xxxx, 10 digits, etc.
  const regex = /^(\+1\s?)?(\d{3}|\(\d{3}\))[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return regex.test(phone.trim());
}

function isValidEmail(email) {
  // Simple email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

function isValidUSZip(zip) {
  // US ZIP: 5 digits or 5-4 digits
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

function isValidCanadaZip(zip) {
  // Canada: A1A 1A1 or A1A-1A1 or A1A1A1
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zip.trim());
}

function submitForm(event) {
  event.preventDefault();
  const hours = document.getElementById("hours").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value;
  const address = document.getElementById("address").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();

  if (!hours || !name || !email || !phone || !country || !address || !zipcode) {
    showMsg("Please fill in all fields.", true);
    return false;
  }
  if (!isValidEmail(email)) {
    showMsg("Please enter a valid email address.", true);
    return false;
  }
  if (isNaN(hours) || Number(hours) < 1 || Number(hours) > 1440) {
    showMsg("Please enter a valid number of hours (1-1440).", true);
    return false;
  }
  if (!isValidUSorCanadaPhone(phone)) {
    showMsg("Please enter a valid US or Canada phone number.", true);
    return false;
  }
  if (country === "USA" && !isValidUSZip(zipcode)) {
    showMsg("Please enter a valid US zip code (e.g. 90210 or 90210-1234).", true);
    return false;
  }
  if (country === "Canada" && !isValidCanadaZip(zipcode)) {
    showMsg("Please enter a valid Canadian postal code (e.g. A1A 1A1).", true);
    return false;
  }

  showMsg("Thank you! Your babysitting request has been received. We will contact you shortly.", false);

  // Optionally, reset the form
  document.getElementById("requestForm").reset();
  return false;
}

function showMsg(message, isError) {
  const msgDiv = document.getElementById("msg");
  msgDiv.style.display = "block";
  msgDiv.style.background = isError ? "#fff2f2" : "#d0f7e9";
  msgDiv.style.color = isError ? "#e74c3c" : "#219a7b";
  msgDiv.style.border = isError ? "1px solid #f7b3b3" : "1px solid #b3e6d6";
  msgDiv.textContent = message;
}
