function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function gethungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

const moles = [
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-0'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-1'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-2'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-3'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-4'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-5'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-6'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-7'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-8'),
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-9'),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case 'sad':
      mole.next = getSadInterval();
      mole.status = 'leaving';
      mole.node.children[0].src = './Static/mole-leaving.png';
      break;
    case 'leaving':
      mole.next = getGoneInterval();
      mole.status = 'gone';
      mole.node.children[0].classList.add('gone');
      break;
    case 'gone':
      mole.status = 'hungry';
      mole.next = gethungryInterval();
      mole.node.children[0].classList.add('hungry');
      mole.node.children[0].classList.remove('gone');
      mole.node.children[0].src = './static/mole-hungry.png';
      break;
    case 'hungry':
      mole.status = 'sad';
      mole.next = getSadInterval();
      mole.node.children[0].classList.remove('hungry');
      mole.node.children[0].src = './static/mole-sad.png';
      break;
  }
}

// When the user clicks on an image or a hungry mole
function feed(e) {
  if (e.target.targName !== 'IMG' || !e.target.classList.contains('hungry')) {
    return;
  }

  //ParseInt because mole from the dataset is a string
  const mole = moles[parseInt(e.target.dataset.index)];

  mole.status = 'fed';
  mole.next = getSadInterval();
  mole.node.children[0].src = './static/mole-fed.png';
  mole.node.children.remove('hungry');
}

let runAgainAt = Date.now() + 100;

function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }

  requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();
