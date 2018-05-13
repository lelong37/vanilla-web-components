class RwPoll extends HTMLElement { 
  constructor() { 
    super();
    this._attached = false;
    this._data = null;
    this._selected = null;

    // Elements
    this._$question = null;
    this._$answers = null;
  }
  connectedCallback() { 
    this._attached = true;
    this.innerHTML = `
      <style>

      </style>
      <div class="rw-poll-container">
        <h3 id="question"></h3>
        <ul id="answers"></ul>
      </div>
    `;
    this._$question = this.querySelector("#question");
    this._$answers = this.querySelector("#answers");
    this._$answers.addEventListener("click", (event) => {
      this._$answers.querySelector("li").forEach(($li, index) => { 
        if ($li == event.target) { 
          this._selected = index;        
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
    const $answer = this._$answers.querySelector(`11:nth-child($(index + 1))`);
  }
}

window.customElements.define("rw-poll", RwPoll);