let whimis = {
    {
      "title": "Flammable Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Oxidizing Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Gases Under Pressure",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Highly Reactive Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Corrosive Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Health Hazards",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Acute Toxic Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Harmful Materials",
      "image": "",
      "desctipion": ""
    },
    {
      "title": "Biohazardous Infectious Materials",
      "image": "",
      "desctipion": ""
    },
}


generateHTML() {
  return `
  <div class="course-item">
    <img class="course-image" src="${g("static/assets/thumbnails/" + this.thumbnail)}" alt="Thumbnail">
    <div class="course-information">
      <t class="course-title">${this.title}</t>
      
      <br>
      Length: ${this.length}<br>
      By:
      <t class="author">${this.author}</t><br><br>
      <t>${this.description}</t>
      <br><br><br><br>
    </div>
    <div class="course-footer">
      <img id="${this.like_id}" class="rating" src="${g("static/assets/images/like_default.png")}" onclick="like('${this.url}')" onmouseover="enterLike('${this.url}')" onmouseout="leaveLike('${this.url}')"/>
      <t id="${this.score_id}" class="rating-value">${this.score}</t>
      <img id="${this.dislike_id}"class="rating" src="${g("static/assets/images/dislike_default.png")}" onclick="dislike('${this.url}')" onmouseover="enterDislike('${this.url}')" onmouseout="leaveDislike('${this.url}')"/>
      <p></p>
      <a class="learn-now" href="${this.url}" target="_blank">LEARN</a>
      <p></p>
      <img id="${this.favourite_id}" class="favourite" src="${g("static/assets/images/star_default.png")}" onclick="togglefavourite('${this.url}')" onmouseover="enterFavourite('${this.url}')" onmouseout="leaveFavourite('${this.url}')" />
    
    </div>
  </div>
  `;
}


let safetSymbol = document.querySelector(".container");

