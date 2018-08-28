import { Employee } from 'Employee';
import { CoffeeUpgrade } from 'CoffeeUpgrade';

export class EmployeeClicker {
    score: number;
    scoreListeners: Function[];
    employees: Employee[];
    monitor!: Element;
    pc!: Element;
    coffee!: Element;
    scoreContainer!: Element;
    singleAudioContainer!: Element;

    constructor() {
        this.score = 0;
        this.scoreListeners = [];
        this.employees = [];
        this.init();
    }

    init() {
        const employeeDiv = document.getElementsByClassName('employee')[0]
        this.employees = [new Employee(employeeDiv, this)];
        this.monitor = document.getElementsByClassName('monitor')[0];
        this.pc = document.getElementsByClassName('pc')[0];
        this.coffee = document.getElementsByClassName('coffee')[0];
        this.scoreContainer = document.getElementsByClassName('score')[0];
        this.singleAudioContainer = document.getElementById('singleAudio')!;
        this.updateScore();
        this.initUpgrades();
    }

    initUpgrades() {
        const coffeeUpgrade = new CoffeeUpgrade(this);
    }

    addToScore(points: number) {
        this.score += points;
        this.updateScore();
    }

    addScoreListener(listener: Function) {
        this.scoreListeners.push(listener);
    }

    updateScore() {
        this.scoreListeners.forEach(listener => listener(this.score));
        // @ts-ignore: Property ‘innerText’ does not exist on type ‘Element’ (TypeScript bug).
        this.scoreContainer.innerText = this.score;
    }

    playAudio(name: string) {
        const audioTag = `<audio autoplay src='public/assets/${name}.mp3'></audio>`;
        const div = document.createElement('div');
        div.innerHTML = audioTag;
        this.singleAudioContainer.appendChild(div);
        setTimeout(() => {
            this.singleAudioContainer.removeChild(div);
        }, 1000)
    }
}