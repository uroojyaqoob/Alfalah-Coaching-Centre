function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}
function loadFaculty() {
  const classSelect = document.getElementById("class");
  const facultyDiv = document.getElementById("faculty-div");
  const facultySelect = document.getElementById("faculty");
if(!classSelect || !facultyDiv || !facultySelect) return;
if(classSelect.value === "") {
    facultyDiv.style.display = "none";
    document.getElementById('fee-details').innerHTML = "";
    return;
  }
  facultyDiv.style.display = "block";
  let options = '<option value="">-- Select Faculty --</option>';
if(classSelect.value === "9-10") {
    options += `
      <option value="Science">Science Group</option>
      <option value="General">General Group</option>
    `;
  } else if(classSelect.value === "11" || classSelect.value === "12") {
    options += `
      <option value="Pre-Engineering">Pre-Engineering</option>
      <option value="Pre-Medical">Pre-Medical</option>
      <option value="CS">CS - Computer Science</option>
      <option value="FA-Arts">FA Arts</option>
      <option value="Home-Economics">Home Economics</option>
      <option value="Commerce">I.Com Commerce</option>
    `;
  } else if(classSelect.value === "test") {
    facultyDiv.style.display = "none";
    showFeeBox("Entry Test Prep", "MDCAT, ECAT, NET", "9:00 AM - 1:00 PM", "Rs. 10,000", "Rs. 3,000");
    return;
  }
facultySelect.innerHTML = options;
  document.getElementById('fee-details').innerHTML = "";
}
function showFeeDetails() {
  const faculty = document.getElementById('faculty').value;
  const classVal = document.getElementById('class').value;
if (!faculty || !classVal) {
    document.getElementById('fee-details').innerHTML = "";
    return;
  }
let data = {};
  const className = classVal === "9-10" ? "Class 9-10" : "Class " + classVal;
  if(classVal === "9-10" && faculty === "Science")
    data = {title: className + " Science", subjects: "Phy, Chem, Bio, Math, Pak Studies, Islamiat, English, Urdu", timings: "5:00 PM - 8:00 PM", monthly: "Rs. 5,000", admission: "Rs. 2,000"};
  else if(classVal === "9-10" && faculty === "General")
    data = {title: className + " General", subjects: "Math, Pak Studies, Islamiat, English, Urdu, General Science, Education, Civics", timings: "5:00 PM - 7:00 PM", monthly: "Rs. 4,500", admission: "Rs. 2,000"};
  else if(faculty === "Pre-Engineering")
    data = {title: className + " Pre-Engineering", subjects: "Phy, Chem, Math, English, Urdu, Islamiat", timings: "6:00 PM - 9:00 PM", monthly: "Rs. 6,500", admission: "Rs. 2,500"};
  else if(faculty === "Pre-Medical")
    data = {title: className + " Pre-Medical", subjects: "Phy, Chem, Bio, English, Urdu, Islamiat", timings: "6:00 PM - 9:00 PM", monthly: "Rs. 6,500", admission: "Rs. 2,500"};
  else if(faculty === "CS")
    data = {title: className + " CS Computer Science", subjects: "Math, Physics, Computer Science, English, Urdu, Islamiat", timings: "5:00 PM - 8:00 PM", monthly: "Rs. 7,000", admission: "Rs. 2,500"};
  else if(faculty === "FA-Arts")
    data = {title: className + " FA Arts", subjects: "Islamiat, English, Urdu, Education, Geography, Civics", timings: "4:00 PM - 6:00 PM", monthly: "Rs. 4,000", admission: "Rs. 1,500"};
  else if(faculty === "Home-Economics")
    data = {title: className + " Home Economics", subjects: "Food, Textile, Child Dev, English, Urdu, Islamiat", timings: "4:00 PM - 6:00 PM", monthly: "Rs. 4,500", admission: "Rs. 1,500"};
  else if(faculty === "Commerce")
    data = {title: className + " I.Com Commerce", subjects: "Accounts, Eco, Business Math, English, Urdu, Islamiat", timings: "5:00 PM - 7:00 PM", monthly: "Rs. 5,000", admission: "Rs. 2,000"};

  showFeeBox(data.title, data.subjects, data.timings, data.monthly, data.admission);
}
function showFeeBox(title, subjects, timings, monthly, admission) {
  const html = `
    <div class="fee-box">
      <h3 style="text-align:center; color:#1e4d8f; margin-bottom:20px;">${title}</h3>
      <table class="fee-table">
        <thead>
          <tr>
            <th>Subjects</th>
            <th>Timings</th>
            <th>Monthly Fee</th>
            <th>Admission Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${subjects}</td>
            <td>${timings}</td>
            <td>${monthly}</td>
            <td>${admission}</td>
          </tr>
        </tbody>
      </table>
      <p style="text-align:center; margin-top:15px; color:#555;">
        <b>Note:</b> Sibling discount 10% | Top 3 students fee waiver every month
      </p>
      <div style="text-align:center; margin-top:20px;">
        <a href="admission.html" class="btn">Get Admission Now</a>
      </div>
    </div>
  `;
  document.getElementById('fee-details').innerHTML = html;
}
function animateCounter() {
  const counters = document.querySelectorAll('.counter');
  const speed = 150; 
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      if(count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}
let counterStarted = false;
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats-section');
  if(statsSection) {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if(sectionPos < screenPos && !counterStarted) {
      animateCounter();
      counterStarted = true;
    }
  }
});
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
if(slides.length > 0){
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides[slideIndex].classList.add('active');
    if(dots[slideIndex]) dots[slideIndex].classList.add('active');
  }
  if(nextBtn) nextBtn.addEventListener('click', () => { slideIndex++; showSlide(slideIndex); });
  if(prevBtn) prevBtn.addEventListener('click', () => { slideIndex--; showSlide(slideIndex); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { slideIndex = index; showSlide(slideIndex); });
  });
  setInterval(() => { slideIndex++; showSlide(slideIndex); }, 4000);
  showSlide(slideIndex);
}
function submitAdmission(event) {
  event.preventDefault(); 
  document.querySelector('.contact-form').style.display = 'none';
  
  // Thank you box show kar do
  document.getElementById('thank-you-box').style.display = 'block';
  
  // Page ko upar scroll kar do
  window.scrollTo({ top: 0, behavior: 'smooth' });
}