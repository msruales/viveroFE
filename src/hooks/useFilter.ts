import {useRef, useState} from "react";
import * as React from "react";

interface OptionPages {
    page: number,
    perPage: number
}

export const useFilter = (pageIn = 1, searchIn = '', rowsPerPage = 10) => {

    const [optionsPage, setOptionsPage] = useState<OptionPages>({
        page: pageIn,
        perPage: rowsPerPage
    })

    const [search, setSearch] = useState(searchIn)

    const handleOnPageChange = (e: React.ChangeEvent<unknown> | React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setOptionsPage((options: OptionPages) => ({...options, page}))
    }
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setOptionsPage((options: OptionPages) => ({...options, perPage: Number(e.target.value)}))
    }
    const debounceRef = useRef<NodeJS.Timeout>()

    const handleChangeSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        if (debounceRef.current)
            clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(() => {
            setSearch(event.target.value)
            setOptionsPage((options: OptionPages) => ({...options, page: pageIn}))
        }, 350)
    }

    return {handleOnPageChange, handleChangeSearch, optionsPage, handleChangeRowsPerPage, search}

}
