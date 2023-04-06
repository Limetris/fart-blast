export default function<T>(model: T): string [] {
    return Object.keys(model)
        .filter(value => isNaN(Number(value)));
}
