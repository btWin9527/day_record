import {devDependencies} from "../../../package.json";

export function Header() {
    return (
        <div className="p-20px text-center">
            <h1 className="font-bold text-2xl mb-2">
                vite version: {devDependencies.vite}
            </h1>
        </div>
    )
}