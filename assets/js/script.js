
/* the text scramble thingy*/


class TextScramble {
  constructor(el) {
    this.el = el;
    /*character variables*/
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}
/*the actual text lol*/

const phrases = [
'My guy,',
'sooner or later',
'you\'re going to realise',
'just as I did',
'that there\'s a difference',
'between knowing the path',
'and walking the path.','Wake up to reality,',
'nothing ever goes as planned','in this accursed world.',
'The longer you live,',
'the more you realise ',
'that the only things that truly exist',
'in this reality are merely',
'pain, suffering, and futility...','Listen',
'everywhere you look in this world',
'wherever there is light',
'there will always be shadows to be found as well.',
'As long as there is a concept of a victors,',
'the vanquished will also exist.',
'The selfish intent of wanting to preserve peace','initiates wars.',
'And hatred is born','in order to protect love.',
'There are nexuses,',
'casual relationships that cannot be separated. ',];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();
