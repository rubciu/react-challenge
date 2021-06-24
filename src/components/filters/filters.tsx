import React, { SetStateAction } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import styles from "./filters.module.css";

type Option = {
  value: string;
  label: string;
};

type FiltersProps = {
  setSearch: (search: SetStateAction<string>) => void;
  setRows: (search: SetStateAction<number>) => void;
};

interface IFormInput {
  language: { label: string; value: string };
  rows: { label: string; value: string };
}

const Filters = ({ setSearch, setRows }: FiltersProps) => {
  const { control } = useForm<IFormInput>();

  const languageOptions: Option[] = [
    { value: "c", label: "C" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "typescript", label: "TypeScript" },
  ];

  const rowsOptions: Option[] = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const handleLanguageChange = (languageEvent: Option | null) => {
    if (languageEvent && languageEvent.value) {
      const language = languageEvent.value;

      setSearch(`language:${language}`);
    }
  };

  const handleRowsChange = (rowsEvent: Option | null) => {
    if (rowsEvent && rowsEvent.value) {
      const rows = parseInt(rowsEvent.value);

      setRows(rows);
    }
  };

  return (
    <form>
      <div className={styles.filters}>
        <div className={styles.language}>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={languageOptions}
                placeholder="Language"
                onChange={(e) => field.onChange(handleLanguageChange(e))}
              />
            )}
          />
        </div>
        <div className={styles.rows}>
          <Controller
            name="rows"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={rowsOptions}
                placeholder="Rows"
                onChange={(e) => field.onChange(handleRowsChange(e))}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default Filters;
