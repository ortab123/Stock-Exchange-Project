export class SearchForm {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.inputElement = containerElement.querySelector("#inputField");
    this.buttomElement = containerElement.querySelector("#searchButton");
  }

  onSearch(callback) {
    this.buttomElement.addEventListener("click", () => {
      const query = this.inputElement.value.trim();
      if (query) {
        callback(query);
      }
    });
  }
}
