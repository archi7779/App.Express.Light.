function Component(target: Function) {
	console.log('A', target);
}

@Component
export class User {
	id: number;
}

// @Component отбработает даже без создания экземпляра класса!

function Component2(id: number) {
	console.log('init');
	return (target: Function) => {
		console.log('run');
		target.prototype.id = id;
	};
}

@Component2(1)
export class User2 {
	id: number;
}
//@Component(1) - init до вызова; run - при создании экземпляра класса

@Component
@Component2(2)
export class User3 {
	id: number;
}
// инициализация сверхну вниз - а выполнение наоборот, снизу вверх будут идти!

//декортатор компонента
function Method(
	target: object,
	propertyKey: string,
	propertyDescripotr: PropertyDescriptor,
	// propertyDescripotr.value = (...args)=>{}- может управлять методом который мы декорирует
);

//`++  декоратор свойства декоратор пропса
