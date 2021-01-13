$(() => {
  window.propertyListing = {};

  function addDishes(dish) {
    return `
    <article class="menu-item">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ?
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>`
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
    `

    `
    <div class="apps">
    <h2>APPETIZERS</h2>
    <div class="menuItem">
      <h3>${dish.name} - ${dish.price}</h3>
      <p>
        Wood oven baked eggplant, topped with ground beef, walnut,
        pomegranate pasts, and spices
      </p>
      <button>ADD</button>
    </div>
  </div>`
  }

  window.propertyListing.createListing = createListing;

});
