import { EmployeeClicker } from 'EmployeeClicker';

export class CoffeeUpgrade {
    game: EmployeeClicker;
    coffeeDiv: Element;

    constructor(game: EmployeeClicker) {
        this.game = game;
        this.coffeeDiv = document.getElementsByClassName('coffee')[0];
        this.game.addScoreListener((score: number) => {
            if(score % 50 === 0) {
                const div = document.createElement('div');
                const button = `<button class="coffee-upgrade">Coffe Upgrade</button>`;
                div.innerHTML = button;
                div.addEventListener('click', () => {
                    this.runUpgrade();
                    document
                        .getElementsByClassName("panel")[0]
                        .removeChild(div);
                });
                document.getElementsByClassName('panel')[0].appendChild(div);
            }
        });
    }

    runUpgrade() {
        this.game.employees.forEach((employee) => {
            employee.intervalTime = employee.intervalTime / 2;
            employee.updateInterval();
            this.coffeeDiv.classList.remove('hidden');
            setTimeout(() => {
                employee.intervalTime = employee.intervalTime * 2;
                this.coffeeDiv.classList.add('hidden');
            }, 20000);
        });
        this.game.addToScore(-120);
    }
}