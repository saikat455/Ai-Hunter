const loadCard = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  console.log(data);
  const ai = data.data.tools;
  displayAi(ai, isShowAll);
};

const displayAi = (ai, isShowAll) => {
  toggoleLoadingSpinner(true);
  const cardContainer = document.getElementById("ai-container");
  cardContainer.innerHTML = "";

  //display show all button if there are more than 10 ai cards
  const showAllContainer = document.getElementById("show-all-container");
  if (ai.length > 10 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //display only first 10 ai cards
  if (!isShowAll) {
    ai = ai.slice(0, 7);
  }
  ai.forEach((card) => {
    const aiCard = document.createElement("div");
    aiCard.classList = `card w-96 bg-base-100 shadow-xl`;

    // Creating an ordered list for card.features
    const featuresList = document.createElement("ol");
    card.features.forEach((feature) => {
      const featureItem = document.createElement("li");
      featureItem.innerText = feature;
      featureItem.style.listStyle = "decimal";
      featuresList.appendChild(featureItem);
    });

    aiCard.innerHTML = `
        <figure>
        <img src="${card.image}" alt="${card.name}" />
        </figure>
        <div class="card-body">
          <p>${card.description}</p>
        <p>${featuresList.innerHTML}</p>
        <hr>
        <div class = "flex justify-between">
            <div>
                <h2 class="card-title">${card.name}</h2>
                <p>${card.published_in}</p>
            </div>
            <div class="card-actions justify-end">
                <button onclick="showDetail('${card.id}') " class="btn btn-primary">details</button>
            </div>
        </div>
        
        </div>
        `;
    cardContainer.appendChild(aiCard);
  });
  // hide loading spinner
  toggoleLoadingSpinner(false);
};

const toggoleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showDetail = async (id) => {
  // console.log(typeof id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const card = data.data;
  // console.log(card);
  showCardDetails(card);
};
const showCardDetails = (card) => {
  const showDetailsContainer = document.getElementById(
    "Show-details-container"
  );

  const featuresList = document.createElement("ol");
    card.integrations.forEach((feature) => {
      const featureItem = document.createElement("li");
      featureItem.innerText = feature;
      featuresList.appendChild(featureItem);
    });

    // const featuresNameList = document.createElement("ol");
    // card.features.feature_name.forEach(feature => {
    //     const featureNameItem = document.createElement('li');
    //     featureNameItem.innerText = feature.feature_name;
    //     featuresNameList.appendChild(featureNameItem);
    // });

    // for (let i = 1; i <= 3; i++) {
    //     const featureIndex = i;
    //     const feature = card?.features && card?.features[featureIndex]?.feature_name
    //         ? card.features[featureIndex].feature_name
    //         : "No data Found";

    //         const featuresNameList = document.createElement("ul");
    //     const featureNameItem = document.createElement('li');
    //     featureNameItem.innerText = feature;
    //     featuresNameList.appendChild(featureNameItem);
    // }

  showDetailsContainer.innerHTML = `
  <div class="flex justify-between p-4 items-center gap-4">
    <div>
        <p>${card.description}</p>
        <div class="flex gap-4 my-3">
            <div class="rounded-xl border-2 bg-gray-300 p-4 text-green-600 text-lg">
                <p>${
                card?.pricing && card?.pricing[0]?.price
                ? card.pricing[0].price
                : "Free of cost"
                }</p>
            <p>${
              card?.pricing && card?.pricing[0]?.plan
                ? card?.pricing[0]?.plan
                : "Basic"
            }</p>
        </div>
        <div class="rounded-xl border-2 bg-gray-300     p-4     text-orange-600 text-lg">
            <p>${
            card?.pricing && card?.pricing[1]?.price
            ? card.pricing[1].price
            : "Free of cost"
            }</p>
            <p>${
            card?.pricing && card?.pricing[1]?.plan
            ? card?.pricing[1]?.plan
            : "Basic"
            }</p>
        </div>
        <div class="rounded-xl border-2 bg-gray-300 p-4 text-red-600 text-lg">
            <p>${
            card?.pricing && card?.pricing[2]?.price
            ? card.pricing[2].price
            : "Free of cost"
            }</p>
            <p>${
            card?.pricing && card?.pricing[2]?.plan
            ? card?.pricing[2]?.plan
            : "Basic"
            }</p>
        </div>
        
    </div>
        <div class="flex justify-between">
            <div>
                <p class="text-3xl font-bold my-2">Features</p> 
                <ul>
                    <li>${card?.features && card?.features[1]?.feature_name ? card.features[1].feature_name : "No data Found"}</li>
                    <li>${card?.features && card?.features[2]?.feature_name ? card.features[2].feature_name : "No data Found"}</li>
                    <li>${card?.features && card?.features[3]?.feature_name ? card.features[3].feature_name : "No data Found"}</li>
                </ul>
            </div>
            <div>
                <p class="text-3xl font-bold my-2">Integrations</p> 
                <p>${featuresList.innerHTML}</p>
            </div>
        </div>
</div>

<div>
    <p><img src="${card.image_link}" alt=""></p>
    <p class="text-center">${card?.input_output_examples && card?.input_output_examples[1]?.input ? card.input_output_examples[1].input : "No data Found"}</p>

    <p class="text-center">${card?.input_output_examples && card?.input_output_examples[1]?.output ? card.input_output_examples[1].output : "No data Found"}</p>
</div>
</div>     

       

        
        

     `;
  //  console.log(card.features);
  show_details_modal.showModal();
};

const handleShowAll = () => {
  loadCard(true);
};
loadCard();