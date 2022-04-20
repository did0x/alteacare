/**
 *
 * @param {component} lazyComponent - React component that you want to code splitting
 * @param {number} attemptsLeft - How many attemps to load the chunks if failed
 */
 export const componentLoader = (lazyComponent, attemptsLeft = 3) => {
	return new Promise((resolve, reject) => {
		lazyComponent()
			.then(resolve)
			.catch((error) => {
				// let us retry after 1500 ms
				setTimeout(() => {
					if (attemptsLeft === 1) {
						reject(error);
						return;
					}
					componentLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
				}, 1500);
			});
	});
};