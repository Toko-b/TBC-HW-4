/**
 * ===================================================================
 * 🚀 CosmoFacts – კოსმოსისა და მეცნიერების ფაქტების აპლიკაცია
 * დავალება 3: AI-ით დაგენერირებული პროექტი (TBC Tech School)
 * ===================================================================
 * 
 * 💡 ძირითადი კონცეფციები:
 * 1. async / await & fetch() – ასინქრონული მოთხოვნა API-სთან
 * 2. try...catch...finally – შეცდომების დაჭერა და UI-ს დაცვა
 * 3. DOM მანიპულაცია – document.getElementById, createElement, appendChild
 * 4. Event Listeners – მომხმარებლის ქმედებებზე (click) რეაგირება
 * 5. State Management – მიმდინარე მონაცემებისა და ფავორიტების მართვა
 */

// -------------------------------------------------------------------
// 1. DOM ელემენტების მოძიება (Elements Reference)
// -------------------------------------------------------------------
const factText = document.getElementById("fact-text");
const factCategory = document.getElementById("fact-category");
const factSource = document.getElementById("fact-source");
const newFactBtn = document.getElementById("new-fact-btn");
const saveFactBtn = document.getElementById("save-fact-btn");
const favoritesList = document.getElementById("favorites-list");
const favoritesCount = document.getElementById("favorites-count");
const emptyState = document.getElementById("empty-state");
const toastMessage = document.getElementById("toast-message");
const filterButtons = document.querySelectorAll(".filter-btn");

// -------------------------------------------------------------------
// 2. აპლიკაციის მდგომარეობა (Application State)
// -------------------------------------------------------------------
let currentFilter = "all"; // მიმდინარე არჩეული კატეგორია

// მიმდინარე აქტიური ფაქტის ობიექტი
let currentFact = {
  id: 1,
  text: "ერთ დღე-ღამე ვენერაზე უფრო დიდხანს გრძელდება, ვიდრე ერთი მთლიანი წელიწადი ვენერაზე. მისი ღერძის გარშემო ბრუნვას 243 დედამიწის დღე სჭირდება, მზის გარშემო შემოვლას კი მხოლოდ 225 დღე.",
  category: "space",
  categoryName: "🚀 კოსმოსი",
  source: "NASA Solar System Exploration"
};

// მომხმარებლის მიერ შენახული ფაქტების მასივი
let savedFacts = [];

// -------------------------------------------------------------------
// 3. სამეცნიერო ფაქტების მონაცემთა ბაზა (Fallback Data)
// გამოიყენება კატეგორიებით ფილტრაციისთვის და ოფლაინ რეჟიმისთვის
// -------------------------------------------------------------------
const scienceFactsDatabase = [
  {
    id: 101,
    text: "ერთ დღე-ღამე ვენერაზე უფრო დიდხანს გრძელდება, ვიდრე ერთი მთლიანი წელიწადი ვენერაზე (243 დღე vs 225 დღე).",
    category: "space",
    categoryName: "🚀 კოსმოსი",
    source: "NASA Science"
  },
  {
    id: 102,
    text: "მზე იმდენად დიდია, რომ მის შიგნით დაახლოებით 1.3 მილიონი დედამიწა თავისუფლად მოთავსდებოდა.",
    category: "space",
    categoryName: "🚀 კოსმოსი",
    source: "ESA Astronomy"
  },
  {
    id: 103,
    text: "ნეიტრონული ვარსკვლავის ერთი ჩაის კოვზი ნივთიერება დედამიწაზე დაახლოებით 6 მილიარდ ტონას იწონის.",
    category: "space",
    categoryName: "🚀 კოსმოსი",
    source: "Astrophysics Journal"
  },
  {
    id: 104,
    text: "სინათლის სხივს მთვარიდან დედამიწამდე მოსაღწევად მხოლოდ 1.3 წამი სჭირდება, ხოლო მზიდან — დაახლოებით 8 წუთი და 20 წამი.",
    category: "physics",
    categoryName: "⚛️ ფიზიკა",
    source: "Physics Review"
  },
  {
    id: 105,
    text: "კვანტურ სამყაროში ნაწილაკებს შეუძლიათ ერთდროულად ორ სხვადასხვა ადგილას არსებობა (კვანტური სუპერპოზიცია).",
    category: "physics",
    categoryName: "⚛️ ფიზიკა",
    source: "Quantum Physics Lab"
  },
  {
    id: 106,
    text: "წყალი ერთადერთი ბუნებრივი ნივთიერებაა დედამიწაზე, რომელიც ერთდროულად სამ აგრეგატულ მდგომარეობაში გვხვდება: თხევადი, მყარი და აირადი.",
    category: "nature",
    categoryName: "🌍 ბუნება",
    source: "Earth Science"
  },
  {
    id: 107,
    text: "რვაფეხებს სამი გული და ლურჯი სისხლი აქვთ. მათი ნერვული უჯრედების უმეტესობა საცეცებშია განლაგებული.",
    category: "nature",
    categoryName: "🌍 ბუნება",
    source: "Marine Biology Institute"
  },
  {
    id: 108,
    text: "მსოფლიოში პირველი კომპიუტერული პროგრამისტი იყო ქალი — ადა ლავლეისი, რომელმაც 1843 წელს პირველი ალგორითმი დაწერა.",
    category: "tech",
    categoryName: "💻 ტექნოლოგია",
    source: "Computer History Museum"
  },
  {
    id: 109,
    text: "დღეს შენს ჯიბეში არსებული სმარტფონი მილიონჯერ უფრო მძლავრია, ვიდრე კომპიუტერი, რომელმაც Apollo 11-ის ასტრონავტები მთვარეზე დასვა.",
    category: "tech",
    categoryName: "💻 ტექნოლოგია",
    source: "Tech History"
  },
  {
    id: 110,
    text: "კოსმოსში აბსოლუტური სიჩუმეა — რადგან იქ არ არის ჰაერი და ატმოსფერო, ბგერით ტალღებს გავრცელება არ შეუძლია.",
    category: "space",
    categoryName: "🚀 კოსმოსი",
    source: "NASA Education"
  }
];

// -------------------------------------------------------------------
// 4. API და ფაქტის წამოღების ლოგიკა (async / await & fetch)
// -------------------------------------------------------------------
/**
 * იღებს ახალ ფაქტს საჯარო API-დან ან ლოკალური სამეცნიერო ბაზიდან
 */
async function fetchNewFact() {
  // ღილაკის დროებით გათიშვა, რათა მომხმარებელმა მრავალჯერ არ დააჭიროს
  newFactBtn.disabled = true;
  newFactBtn.classList.add("opacity-75", "cursor-not-allowed");
  
  // ანიმაციით ტექსტის შეცვლა
  factText.style.opacity = "0.3";
  factText.textContent = "⏳ სამყაროს სიღრმეებიდან ფაქტი იტვირთება...";

  try {
    // თუ არჩეულია "ყველა", ვცდილობთ საჯარო API-ს გამოძახებას
    if (currentFilter === "all") {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
      
      // შევამოწმოთ HTTP სტატუსი (200-299)
      if (response.ok) {
        const data = await response.json();
        
        // მიღებული მონაცემების შენახვა მიმდინარე ფაქტში
        currentFact = {
          id: Date.now(),
          text: data.text,
          category: "nature",
          categoryName: "🌐 სამეცნიერო ფაქტი",
          source: "Global Facts API"
        };
      } else {
        throw new Error(`სერვერის შეცდომა: ${response.status}`);
      }
    } else {
      // თუ არჩეულია კონკრეტული კატეგორია (კოსმოსი, ფიზიკა და ა.შ.), ვირჩევთ ბაზიდან
      pickFactFromLocalDatabase(currentFilter);
    }
  } catch (error) {
    // თუ ქსელი გაითიშა ან API-მ შეცდომა დააბრუნა, ამოქმედდება სათადარიგო ბაზა
    console.warn("API მოთხოვნა ვერ შესრულდა, ჩაირთო სათადარიგო ბაზა:", error.message);
    pickFactFromLocalDatabase(currentFilter);
  } finally {
    // finally ბლოკი ეშვება ყოველთვის: შეცდომის მიუხედავად აღვადგენთ UI-ს
    renderCurrentFact();
    factText.style.opacity = "1";
    newFactBtn.disabled = false;
    newFactBtn.classList.remove("opacity-75", "cursor-not-allowed");
  }
}

/**
 * დამხმარე ფუნქცია: ფაქტის არჩევა ლოკალური ბაზიდან ფილტრის გათვალისწინებით
 */
function pickFactFromLocalDatabase(category) {
  const filteredList = category === "all" 
    ? scienceFactsDatabase 
    : scienceFactsDatabase.filter(item => item.category === category);

  // იმავე ფაქტის განმეორების თავიდან აცილება
  const candidates = filteredList.filter(item => item.text !== currentFact.text);
  const pool = candidates.length > 0 ? candidates : filteredList;

  const randomIndex = Math.floor(Math.random() * pool.length);
  currentFact = { ...pool[randomIndex] };
}

// -------------------------------------------------------------------
// 5. DOM-ის განახლება (Render Functions)
// -------------------------------------------------------------------
/**
 * ეკრანზე გამოაქვს მიმდინარე ფაქტი
 */
function renderCurrentFact() {
  factText.textContent = `"${currentFact.text}"`;
  factCategory.textContent = currentFact.categoryName || "💡 ფაქტი";
  factSource.textContent = `წყარო: ${currentFact.source}`;
}

/**
 * აახლებს რჩეული ფაქტების სიას (DOM Manipulation: createElement, appendChild)
 */
function renderFavorites() {
  // მთვლელის განახლება
  favoritesCount.textContent = `${savedFacts.length} ფაქტი`;

  // თუ სია ცარიელია, ვაჩვენებთ Empty State-ს
  if (savedFacts.length === 0) {
    favoritesList.innerHTML = "";
    favoritesList.appendChild(emptyState);
    return;
  }

  // წინა შიგთავსის გასუფთავება
  favoritesList.innerHTML = "";

  // ყოველი შენახული ფაქტისთვის ახალი <li> ელემენტის შექმნა
  savedFacts.forEach((fact) => {
    const li = document.createElement("li");
    li.className = "flex items-start justify-between gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5 hover:border-indigo-500/50 transition-all";

    li.innerHTML = `
      <div class="flex-1">
        <span class="inline-block text-[11px] font-semibold text-indigo-400 mb-1">
          ${fact.categoryName}
        </span>
        <p class="text-xs text-slate-200 leading-relaxed">${fact.text}</p>
        <span class="text-[10px] text-slate-400 mt-1 block">${fact.source}</span>
      </div>
      <button 
        class="delete-btn text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 p-1.5 rounded-lg transition text-xs cursor-pointer" 
        title="წაშლა"
        aria-label="ფაქტის წაშლა"
      >
        ✕
      </button>
    `;

    // წაშლის ღილაკზე მოვლენის მიბმა
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      removeFactFromFavorites(fact.id);
    });

    favoritesList.appendChild(li);
  });
}

// -------------------------------------------------------------------
// 6. ფავორიტების მართვის ლოგიკა (Save & Delete)
// -------------------------------------------------------------------
/**
 * მიმდინარე ფაქტის დამატება რჩეულებში
 */
function saveFactToFavorites() {
  // შემოწმება: უკვე ხომ არ არის შენახული?
  const isAlreadySaved = savedFacts.some(f => f.text === currentFact.text);

  if (isAlreadySaved) {
    showToast("⚠️ ეს ფაქტი უკვე შენახულია თქვენს რჩეულებში!", "warning");
    return;
  }

  // ახალი ფაქტის დამატება მასივში
  savedFacts.unshift({
    id: Date.now(),
    text: currentFact.text,
    categoryName: currentFact.categoryName,
    source: currentFact.source
  });

  // სიის ხელახლა გადახატვა
  renderFavorites();
  showToast("✨ ფაქტი წარმატებით დაემატა რჩეულებში!", "success");
}

/**
 * ფაქტის წაშლა რჩეულებიდან id-ის მიხედვით
 */
function removeFactFromFavorites(id) {
  // filter() მეთოდით ვტოვებთ ყველა ელემენტს ამ id-ის გარდა
  savedFacts = savedFacts.filter(fact => fact.id !== id);
  renderFavorites();
  showToast("🗑️ ფაქტი წაიშალა რჩეულებიდან.", "info");
}

/**
 * შეტყობინების ჩვენება მომხმარებლისთვის (Toast Notification)
 */
function showToast(message, type = "success") {
  toastMessage.textContent = message;
  toastMessage.classList.remove("hidden", "bg-emerald-900/60", "text-emerald-300", "border-emerald-600/50", "bg-amber-900/60", "text-amber-300", "border-amber-600/50", "bg-rose-900/60", "text-rose-300", "border-rose-600/50");

  if (type === "success") {
    toastMessage.classList.add("bg-emerald-900/60", "text-emerald-300", "border", "border-emerald-600/50");
  } else if (type === "warning") {
    toastMessage.classList.add("bg-amber-900/60", "text-amber-300", "border", "border-amber-600/50");
  } else {
    toastMessage.classList.add("bg-slate-800", "text-slate-300", "border", "border-slate-700");
  }

  // 3 წამის შემდეგ გაქრობა
  setTimeout(() => {
    toastMessage.classList.add("hidden");
  }, 3000);
}

// -------------------------------------------------------------------
// 7. კატეგორიების ფილტრის ლოგიკა
// -------------------------------------------------------------------
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // ღილაკების ვიზუალური სტილების გადართვა
    filterButtons.forEach(btn => {
      btn.classList.remove("active", "bg-indigo-600", "text-white");
      btn.classList.add("bg-slate-800", "text-slate-300");
    });

    button.classList.add("active", "bg-indigo-600", "text-white");
    button.classList.remove("bg-slate-800", "text-slate-300");

    // მიმდინარე კატეგორიის განახლება და ახალი ფაქტის გამოტანა
    currentFilter = button.getAttribute("data-category");
    pickFactFromLocalDatabase(currentFilter);
    renderCurrentFact();
  });
});

// -------------------------------------------------------------------
// 8. Event Listeners (ღილაკებზე მიბმა) & ინიციალიზაცია
// -------------------------------------------------------------------
newFactBtn.addEventListener("click", fetchNewFact);
saveFactBtn.addEventListener("click", saveFactToFavorites);

// აპლიკაციის საწყისი გაშვება
renderCurrentFact();
renderFavorites();

