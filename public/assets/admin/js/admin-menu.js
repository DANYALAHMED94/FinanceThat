const list = document.querySelectorAll('.list');
function accordion(e) {
  // e.stopPropagation();
  if (this.classList.contains('active')) {
    this.classList.remove('#');
  }
  else if (this.parentElement.parentElement.classList.contains('active')) {
    this.classList.add('active');
  }
  else {
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('active');
    }
    this.classList.add('active');
  }
}
for (var i = 0; i < list.length; i++) {
  list[i].addEventListener('click', accordion);
}
