'use strict';

const url = 'http://localhost:3010';
const form = document.getElementById('commentForm');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(form);
  console.log('dataa', data);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  
  const response = await fetch(url + '/api/post', fetchOptions);
  const json = await response.json();
  console.log('comment post response', json);
  getMessages();
});

const getMessages = async () => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/api/getPosts', fetchOptions);
    const messages = await response.json();
    console.log(messages);
    showMessages(messages);
    calcurateRatings(messages);

  } catch (e) {
    console.log(e.message);
  }
};
  
getMessages();

const calcurateRatings = (messages) => {
  const totalRatings = messages.length;
  console.log(totalRatings);
  const ratingsCount = [0, 0, 0, 0, 0];

  messages.forEach((message) => {
    const rating = message.rating;
    if (rating >= 1 && rating <= 5) {
      ratingsCount[rating - 1]++;
    }
  });

const rating1Fraction = Math.round((ratingsCount[4] / totalRatings) * 100);
const rating2Fraction = Math.round((ratingsCount[3] / totalRatings) * 100);
const rating3Fraction = Math.round((ratingsCount[2] / totalRatings) * 100);
const rating4Fraction = Math.round((ratingsCount[1] / totalRatings) * 100);
const rating5Fraction = Math.round((ratingsCount[0] / totalRatings) * 100);

const rating1Class = `${rating1Fraction}%`;
const rating2Class = `${rating2Fraction}%`;
const rating3Class = `${rating3Fraction}%`;
const rating4Class = `${rating4Fraction}%`;
const rating5Class = `${rating5Fraction}%`;

const ratingCard = document.getElementById('ratingCard');

for (let i = 5; i > 0; i--) {

  const ratingDiv = document.createElement('div');
  ratingDiv.classList.add('flex');
  const ratingText = document.createElement('p');
  ratingText.classList.add('text-sm', 'text-gray-100', 'mr-1', 'w-3');
  ratingText.innerText = `${i}`;
  const ratingImg = document.createElement('img');
  ratingImg.classList.add('w-4', 'h-4', 'mr-1');
  ratingImg.src = 'img/star.svg';

  const childDivWrapper = document.createElement('div');
  childDivWrapper.classList.add('bg-gray-200', 'mb-1', 'h-4', 'w-full');

  const childDiv = document.createElement('div');
  childDiv.id = `rating${i}`;
  childDiv.classList.add('bg-primary-500', 'h-4');
  
  childDivWrapper.appendChild(childDiv);
  ratingCard.appendChild(ratingDiv);
  ratingDiv.appendChild(ratingImg);
  ratingDiv.appendChild(ratingText);
  ratingDiv.appendChild(childDivWrapper);

}

const w1 = document.getElementById(`rating5`);
w1.style.width = `${rating1Class}`;
const w2 = document.getElementById(`rating4`);
w2.style.width = `${rating2Class}`;
const w3 = document.getElementById(`rating3`);
w3.style.width = `${rating3Class}`;
const w4 = document.getElementById(`rating2`);
w4.style.width = `${rating4Class}`;
const w5 = document.getElementById(`rating1`);
w5.style.width = `${rating5Class}`;

};

const showMessages = (messages) => {
  const commentContainer = document.getElementById('comments');
  //commentContainer.classList.add('flex', 'flex-col', 'items-center', 'w-full');
  commentContainer.innerHTML = '';

  messages.forEach((message) => {

    const commentDiv = document.createElement('div');
    commentDiv.classList.add(
      'p-2',
      'text-sm',
      'rounded-lg',
      'mb-4',
      'w-full',
      'shadow',
      'bg-secondary-100',
    );

    const header = document.createElement('div');
    header.classList.add('flex', 'justify-between');

    const name = document.createElement('p');
    name.innerText = message.name;
    name.classList.add('text-secondary-900');

    const localTime = new Date(message.createdAt);
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedTime = localTime.toLocaleTimeString('fi-FI', options);
    const time = document.createElement('p');
    time.innerText = formattedTime;
    time.classList.add('text-xs', 'text-gray-500', 'ml-2');

    header.appendChild(name);
    header.appendChild(time);

    const rating = document.createElement('div');
    rating.classList.add('flex', 'justify-start', 'items-center', 'py-1');
    for (let i = 0; i < message.rating; i++) {
        const star = document.createElement('img');
        star.classList.add('w-4', 'h-4');
        star.src = 'img/star.svg';
        rating.appendChild(star);
    }

    const comment = document.createElement('p');
    comment.innerText = message.message;

    commentDiv.appendChild(header);
    commentDiv.appendChild(rating);
    commentDiv.appendChild(comment);
    commentContainer.appendChild(commentDiv);
  });

};

  