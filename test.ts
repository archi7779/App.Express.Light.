interface HasLeangth  {
    length: number
}

const log = <T extends HasLeangth, K>(obj: T, arr: K[]): K[] => {
    obj.length
    return arr
}

interface IUser {
    name: string;
    age?: number;
    bid: <T>(sum: T) => boolean;
}

class Coord {
    lat: number;
    constructor(lat: number) {
        this.lat = lat;
    }
}

class MapLocations extends Coord {
    name: string
    constructor(lat: number, name: string){ // сначал всегда вызовется конструктор от чего наследуемся!
        super(lat);
        this.name = name;
    }
}
const point = new Coord(1)

interface LoggerService {
    log: (s: string) => void;
}
class Logger implements LoggerService {
     public log(s: string) { // public - публичный
            console.log(s)
        }   
    private error() { // доступ внутри? 


}}

//protected = доступен в классе  в тех кто из него наследуется но не извне

// class MyClass {
//     static a = '1'
// }
// MyClass.a

class MyClass<T>{
    a: T
}

const b = new MyClass<string>();
b.a

// abstract class // не можем new сделать но можем создать др класс extends asbstract Class
//так же абстрактными могут быть методы

//
let test = "asd";
let test2: typeof test
type CoordTest = {
    lat: number;
    log: number;
}

type p = keyof CoordTest // в п может быть лат или лог 
// null 
//void - функция ничего не возвращает
//a!.toLowerCase();// точно будет!


