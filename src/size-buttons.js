export function fullSizeBlock() {
    const deathBlock = document.querySelector(".death_block");
    const healthBlock = document.querySelector(".health_block");
    const chartBlock = document.querySelector(".chartBlock");
    const deathButton = document.querySelector('.size_button_death');
    const healthButton = document.querySelector('.size_button_health');
    const chartButton = document.querySelector('.size_button_chart');

    deathButton.addEventListener('click', () => {
            deathBlock.classList.toggle('full_size');
            deathBlock.children[2].classList.toggle('full_size_small');
        });

    healthButton.addEventListener('click', () => {
        healthBlock.classList.toggle('full_size');
        healthBlock.children[2].classList.toggle('full_size_small');
    });

    chartButton.addEventListener('click', () => {
        chartBlock.classList.toggle('full_size');
    });
}

export function hideSizeButton() {
    const deathButton = document.querySelector('.size_button_death');
    const healthButton = document.querySelector('.size_button_health');
    const chartButton = document.querySelector('.size_button_chart');

    const deathBlock = document.querySelector(".death_block");
    const healthBlock = document.querySelector(".health_block");
    const chartBlock = document.querySelector(".chartBlock");

    deathBlock.addEventListener('mouseenter', () => {
        deathButton.classList.toggle('hidden');
    });
    deathBlock.addEventListener('mouseleave', () => {
        deathButton.classList.toggle('hidden');
    });
    healthBlock.addEventListener('mouseenter', () => {
        healthButton.classList.toggle('hidden');
    });
    healthBlock.addEventListener('mouseleave', () => {
        healthButton.classList.toggle('hidden');
    });
    chartBlock.addEventListener('mouseenter', () => {
        chartButton.classList.toggle('hidden');
    });
    chartBlock.addEventListener('mouseleave', () => {
        chartButton.classList.toggle('hidden');
    });
}
