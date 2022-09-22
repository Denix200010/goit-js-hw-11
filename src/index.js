import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetching from './js components/fetching';
import photoRenderMarkup from './js components/photo-markup';
import './style.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formRef = document.querySelector('.search-form');
const btnLoadMoreRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');

let searchQuery = null;
let page = 1;
let simpleLightBox = null;
const step = 40;

formRef.addEventListener('submit', onFormSubmit);
btnLoadMoreRef.addEventListener('click', onMoreBtnClick);

function onFormSubmit(e) {
    e.preventDefault();
    page = 1;
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    
        btnLoadMoreRef.classList.add('hidden');
    
    if (searchQuery === '') {
        return Notify.failure('First enter a value in the field');
    }
    galleryRef.innerHTML = '';
    
    fetching(searchQuery, page, step)
        .then(resp => {
        if (resp.data.totalHits === 0) {
            return Notify.failure("We're sorry, but you've reached the end of search results.")
        }
            photoRenderMarkup(resp.data.hits)
            simpleLightBox = new SimpleLightbox('.gallery a',{
        captionType: "alt",
        captionsData: "alt",
        captionDelay: 250,
    }).refresh();
        Notify.success(`Hooray! We found ${resp.data.totalHits} images.`)
        if (resp.data.totalHits > step) {
        btnLoadMoreRef.classList.remove('hidden');
        }})
        .catch(error => console.log(error))
        .finally(() => formRef.reset())
    
}

function onMoreBtnClick() {
    page += 1;
    simpleLightBox.destroy();
    fetching(searchQuery, page, 40)
        .then(resp => {
            photoRenderMarkup(resp.data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a',{
        captionType: "alt",
        captionsData: "alt",
        captionDelay: 250,
    }).refresh();
        })
        .catch(error => console.log(error));
}