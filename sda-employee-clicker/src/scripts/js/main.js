define("Employee", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Employee = /** @class */ (function () {
        function Employee(element, game) {
            var _this = this;
            this.game = game;
            this.intervalTime = 5000;
            this.element = element;
            this.element.addEventListener('click', function () {
                _this.click();
            });
            this.updateInterval();
        }
        Employee.prototype.click = function () {
            this.game.addToScore(1);
            this.game.playAudio('employeeClick');
        };
        Employee.prototype.work = function () {
            this.game.addToScore(10);
        };
        Employee.prototype.updateInterval = function () {
            var _this = this;
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(function () {
                _this.work();
            }, this.intervalTime);
        };
        return Employee;
    }());
    exports.Employee = Employee;
});
define("EmployeeClicker", ["require", "exports", "Employee", "CoffeeUpgrade"], function (require, exports, Employee_1, CoffeeUpgrade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EmployeeClicker = /** @class */ (function () {
        function EmployeeClicker() {
            this.score = 0;
            this.scoreListeners = [];
            this.employees = [];
            this.init();
        }
        EmployeeClicker.prototype.init = function () {
            var employeeDiv = document.getElementsByClassName('employee')[0];
            this.employees = [new Employee_1.Employee(employeeDiv, this)];
            this.monitor = document.getElementsByClassName('monitor')[0];
            this.pc = document.getElementsByClassName('pc')[0];
            this.coffee = document.getElementsByClassName('coffee')[0];
            this.scoreContainer = document.getElementsByClassName('score')[0];
            this.singleAudioContainer = document.getElementById('singleAudio');
            this.updateScore();
            this.initUpgrades();
        };
        EmployeeClicker.prototype.initUpgrades = function () {
            var coffeeUpgrade = new CoffeeUpgrade_1.CoffeeUpgrade(this);
        };
        EmployeeClicker.prototype.addToScore = function (points) {
            this.score += points;
            this.updateScore();
        };
        EmployeeClicker.prototype.addScoreListener = function (listener) {
            this.scoreListeners.push(listener);
        };
        EmployeeClicker.prototype.updateScore = function () {
            var _this = this;
            this.scoreListeners.forEach(function (listener) { return listener(_this.score); });
            // @ts-ignore: Property ‘innerText’ does not exist on type ‘Element’ (TypeScript bug).
            this.scoreContainer.innerText = this.score;
        };
        EmployeeClicker.prototype.playAudio = function (name) {
            var _this = this;
            var audioTag = "<audio autoplay src='public/assets/" + name + ".mp3'></audio>";
            var div = document.createElement('div');
            div.innerHTML = audioTag;
            this.singleAudioContainer.appendChild(div);
            setTimeout(function () {
                _this.singleAudioContainer.removeChild(div);
            }, 1000);
        };
        return EmployeeClicker;
    }());
    exports.EmployeeClicker = EmployeeClicker;
});
define("CoffeeUpgrade", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CoffeeUpgrade = /** @class */ (function () {
        function CoffeeUpgrade(game) {
            var _this = this;
            this.game = game;
            this.coffeeDiv = document.getElementsByClassName('coffee')[0];
            this.game.addScoreListener(function (score) {
                if (score % 50 === 0) {
                    var div_1 = document.createElement('div');
                    var button = "<button class=\"coffee-upgrade\">Coffe Upgrade</button>";
                    div_1.innerHTML = button;
                    div_1.addEventListener('click', function () {
                        _this.runUpgrade();
                        document
                            .getElementsByClassName("panel")[0]
                            .removeChild(div_1);
                    });
                    document.getElementsByClassName('panel')[0].appendChild(div_1);
                }
            });
        }
        CoffeeUpgrade.prototype.runUpgrade = function () {
            var _this = this;
            this.game.employees.forEach(function (employee) {
                employee.intervalTime = employee.intervalTime / 2;
                employee.updateInterval();
                _this.coffeeDiv.classList.remove('hidden');
                setTimeout(function () {
                    employee.intervalTime = employee.intervalTime * 2;
                    _this.coffeeDiv.classList.add('hidden');
                }, 20000);
            });
            this.game.addToScore(-120);
        };
        return CoffeeUpgrade;
    }());
    exports.CoffeeUpgrade = CoffeeUpgrade;
});
define("main", ["require", "exports", "EmployeeClicker"], function (require, exports, EmployeeClicker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new EmployeeClicker_1.EmployeeClicker();
});
