/**
 * ========================================================
 * 🎓 TBC Tech School · Lecture 5 · დავალება 1 (ხელით დასაწერი)
 * თემა: ცვლადები, ფუნქციები, DOM მანიპულაცია და Event Listeners
 * ========================================================
 * 
 * 🎯 მიზანი:
 * დაწერე JavaScript ლოგიკა, რომელიც:
 * 1. წაიკითხავს ინფუთში ჩაწერილ ტექსტს
 * 2. შექმნის ახალ <li> ბარათს Tailwind-ის სტილებით
 * 3. დაამატებს სიაში (#skills-list)
 * 4. გაზრდის მთვლელს (#counter)
 * 5. წაშლის კონკრეტულ ელემენტს ნაგვის ურნაზე დაჭერისას
 * 6. გაასუფთავებს მთელ სიას "ყველას გასუფთავება" ღილაკზე
 */

// ---------------------------------------------------------
// ნაბიჯი 1: HTML ელემენტების წამოღება DOM-იდან
// გამოიყენე document.getElementById(...)
// ---------------------------------------------------------
let counter = document.getElementById("counter");
let statusMes = document.getElementById("status-message");
const input = document.getElementById("skill-input");
const addBtn = document.getElementById("add-btn");
const errorMes = document.getElementById("error-message");
const clearBtn = document.getElementById("clear-btn");
const skillsLs = document.getElementById("skills-list");
// ---------------------------------------------------------
// ნაბიჯი 2: ცვლადი მთვლელისთვის
// რატომ let და არა const? (რადგან მისი მნიშვნელობა იცვლება!)
// ---------------------------------------------------------
let total = 0;
// ---------------------------------------------------------
// ნაბიჯი 3: დამხმარე ფუნქცია სტატუსის და მთვლელის განახლებისთვის
// ---------------------------------------------------------    function updateUI() {
function updateUI() {
  counter.textContent = total;
  if (total === 0) {
    statusMes.textContent = "სია ჯერ ცარიელია";
    statusMes.className = "text-sm text-slate-400 font-medium";
  } else {
    statusMes.textContent = `თქვენ სწავლობთ ${total} უნარს! 🚀`;
    statusMes.className = "text-sm text-emerald-400 font-medium";
  }
}

// მთვლელის ტექსტის განახლება

// თუ რაოდენობა 0-ია, სტატუსი იყოს "სია ჯერ ცარიელია",
// თუ მეტია — "თქვენ სწავლობთ X უნარს!"


// ---------------------------------------------------------
// ნაბიჯი 4: ახალი უნარის დამატების ფუნქცია
// ---------------------------------------------------------

const addSkillItem = () => {
  let inputValue = input.value.trim();
  // შემოწმება: თუ ველი ცარიელია, ვაჩვენებთ ერორს
  if (inputValue === 0) {
    errorMes.classList.remove("hidden");
    return;
  }
  // თუ ტექსტი წერია, ერორს ვმალავთ
  errorMes.classList.add("hidden");

  // TODO 1: შექმენი ახალი <li> ელემენტი document.createElement-ით

  // Tailwind სტილები ლამაზი ბარათისთვის

  const skillItem = document.createElement("li");
  skillItem.className = "p-3 rounded-md text-white bg-slate-900 gap-3 flex justify-between shadow-md border border-slate-700 hover:border-cyan-700";
  // TODO 2: ჩაწერე li-ის შიგთავსი innerHTML-ით (ტექსტი + წაშლის ღილაკი)
  skillItem.innerHTML = `<span class="flex gap-2">✨<span>${inputValue}</span></span><button class="delete-btn">🗑️</button>`;
  // TODO 3: იპოვე ახლად შექმნილ li-ში წაშლის ღილაკი და დაუმატე წაშლის ლოგიკა

  // ელემენტის წაშლა DOM-იდან
  // მთვლელის შემცირება
  // UI-ის განახლება
  const deleteBtn = skillItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    skillItem.remove();
    total--;
    updateUI();
  })
  // TODO 4: დაამატე შექმნილი li სიაში (skillsList.appendChild)
  skillsLs.appendChild(skillItem);

  // TODO 5: გაზარდე totalSkills 1-ით და განაახლე UI
  total++;
  updateUI();
  // ინფუთის გასუფთავება და ფოკუსის დაბრუნება
  input.value = "";
  input.focus()
}

// ---------------------------------------------------------
// ნაბიჯი 5: მთელი სიის გასუფთავების ფუნქცია
// ---------------------------------------------------------
const deleteAll = () => {
  skillsLs.innerHTML = "";
  total = 0;
  updateUI()
  errorMes.classList.add("hidden");
}
// ---------------------------------------------------------
// ნაბიჯი 6: Event Listeners (მოვლენების მოსმენა)
// ---------------------------------------------------------

// ღილაკზე "დამატება" დაწკაპუნებისას
addBtn.addEventListener("click", addSkillItem);
// ინფუთში "Enter" ღილაკზე დაჭერისას
input.addEventListener("keydown", (e) =>{if(e.key === "Enter"){addSkillItem()}})
// ღილაკზე "ყველას გასუფთავება" დაწკაპუნებისას
clearBtn.addEventListener("click", deleteAll)

// საწყისი UI-ს ინიციალიზაცია
updateUI()