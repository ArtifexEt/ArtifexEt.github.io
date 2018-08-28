import { EmployeeClicker } from 'EmployeeClicker';

export class Employee {
    game: EmployeeClicker;
    intervalTime: number;
    element: Element;
    intervalId: any;
    
    constructor(element: Element, game: EmployeeClicker) {
        this.game = game;
        this.intervalTime = 5000;
        this.element = element;
        this.element.addEventListener('click', () => {
            this.click();
        });
        this.updateInterval();
    }
    
    click() {
        this.game.addToScore(1);
        this.game.playAudio('employeeClick');
    }
    
    work() {
        this.game.addToScore(10);
    }

    updateInterval() {
        if(this.intervalId) {
            clearInterval(this.intervalId);    
        }
        this.intervalId = setInterval(() => {
            this.work();
        }, this.intervalTime);
    }
}