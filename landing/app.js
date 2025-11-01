// basic interactions: mobile nav, simple listing filters, form handler & year
document.addEventListener('DOMContentLoaded', ()=> {
  // years
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // mobile nav toggle
  function setupBurger(btnId, navId) {
    const btn = document.getElementById(btnId);
    const nav = document.getElementById(navId) || document.querySelector('.nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', ()=> {
      const shown = nav.style.display === 'flex';
      nav.style.display = shown ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'rgba(0,0,0,0.9)';
      nav.style.padding = '12px';
    });
  }
  setupBurger('burgerBtn','mainNav');
  setupBurger('burgerBtn2','mainNav2');
  setupBurger('burgerBtn3','mainNav3');
  setupBurger('burgerBtn4','mainNav4');

  // simple listings filter
  const grid = document.getElementById('listingsGrid');
  if(grid){
    const city = document.getElementById('filterCity');
    const beds = document.getElementById('filterBeds');
    const price = document.getElementById('filterPrice');
    const reset = document.getElementById('resetFilters');

    function applyFilters(){
      const cityVal = city.value;
      const bedsVal = beds.value;
      const priceVal = price.value === 'all' ? Infinity : Number(price.value);

      const cards = grid.querySelectorAll('.prop-card');
      cards.forEach(card=>{
        const c = card.dataset.city;
        const b = card.dataset.beds;
        const p = Number(card.dataset.price);
        let visible = true;
        if(cityVal !== 'all' && c !== cityVal) visible = false;
        if(bedsVal !== 'all'){
          if(bedsVal === '3'){ if(Number(b) < 3) visible = false; }
          else if(Number(b) !== Number(bedsVal)) visible = false;
        }
        if(p > priceVal) visible = false;
        card.style.display = visible ? 'block' : 'none';
      });
    }
    [city,beds,price].forEach(el => el && el.addEventListener('change', applyFilters));
    reset && reset.addEventListener('click', ()=>{
      city.value='all'; beds.value='all'; price.value='all'; applyFilters();
    });
  }

  // contact form demo (prevent real submit)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // basic success UI
      alert('Thanks — your message has been received. We will respond to you shortly.');
      contactForm.reset();
    });
  }
});
