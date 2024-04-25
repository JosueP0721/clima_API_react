import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({ fetchWeather } : FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')) {
            setAlert('TOdos los Campos son Obligatorios')
            return
        }
        fetchWeather(search)
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city" 
                    type="text" 
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País --</option>
                    { countries.map(country => (
                        <option 
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input 
                type="submit"
                value="Consultar Clima"
                className={styles.submit}
            />
        </form>
    )
}