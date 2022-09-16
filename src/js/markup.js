export function imagesMarkup(images){
    const markup = images.map(image => {
        const { webformatURL, tags, likes, views, comments, downloads} = image;
        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes </b>${likes}
          </p>
          <p class="info-item">
            <b>Views </b>${views}
          </p>
          <p class="info-item">
            <b>Comments </b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads </b>${downloads}
          </p>
        </div>
        </div>`
    }).join('');

    return markup;
}