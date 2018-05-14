class RwPoll extends HTMLElement { 
  constructor() { 
    super();
    this._attached = false;
    this._data = {
      "question": "This is a new question",
      "answers": ["New answer one.", "New answer two."]
    };
    this._selected = null;

    // Elements
    this._$question = null;
    this._$answers = null;

    this._root = this.attachShadow({ "mode": "open" });
  }
  connectedCallback() { 
    this._attached = true;
    this._root.innerHTML = `
      <style>
        #question {
          background-color: gray;
          font-color: white;
        }
        .selected {
          background-color: green;
        }
        li {
          background-color: white;
        }
      </style>
      <div class="rw-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;
    this._$question = this._root.querySelector("#question");
    this._$answers = this._root.querySelector("#answers");
    this._$answers.addEventListener("click", (event) => {
      this._$answers.querySelectorAll("li").forEach(($li, index) => { 
        if ($li == event.target) { 
          this.selected = index;        
        }  
      })
    });
    this._render()
  }
  _render() { 
    if (this._attached && this._data !== null) { 
      this._$answers.innerHTML = "";
      this._$question.innerHTML = this._data.question;
      this._data.answers.forEach((answer) => {
        const $li = document.createElement("li");
        $li.innerHTML = answer;
        this._$answers.appendChild($li);
      })
   }
  }
  set data(data) {
    if (this._data === data) return;
    this._data = data;
    this._render();
  }
  get data() { 
    return this._data;
  }
  set selected(index) {
    const $answer = this._$answers.querySelector(`li:nth-child(${index + 1})`);
    if ($answer !== null) {
      this._$answers.querySelectorAll("li").forEach(($li) => {
        $li.classList.remove("selected");
      });
      $answer.classList.add("selected");
      this._selected = index;
    }
  }
  get selected() { 
    return this._selected;
  }
}

window.customElements.define("rw-poll", RwPoll);