const galleryRef = document.querySelector('.gallery');
export default function photoRenderMarkup(photos) {
    const markup = photos.map(({ likes, webformatURL, largeImageURL, tags, views, comments, downloads }) => {
         
        return `<div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
  </a>
</div>`}).join('');
    galleryRef.insertAdjacentHTML('beforeend', markup);
}