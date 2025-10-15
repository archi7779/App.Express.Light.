import 'reflect-metadata';

function Test(target: Function) {
	Reflect.defineMetadata('a', 1, target);
	const meta = Reflect.getMetadata('a', target);
	console.log(meta);
}

@Test
class C {}

//и вот с помощью ts-декораторов + рефлект метадата работают DI например в inversifyJs
