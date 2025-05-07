import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useHistoryStore } from "@/store/history/store";
export function useSearchWithDebounce(
  searchQuery: string = "",
  debounceTime: number = 1000
) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const { setSearchQuery } = useHistoryStore();

  const debouncedUpdate = useCallback(
    debounce((query: string) => setSearchQuery(query), debounceTime),
    [setSearchQuery, debounceTime]
  );

  const handleChange = useCallback(
    (value: string) => {
      // 로컬 상태 업데이트 (UI 반영)
      setInputValue(value);
      // 디바운스 적용 (API 호출 최적화)
      debouncedUpdate(value);
    },
    [debouncedUpdate]
  );

  useEffect(() => {
    debouncedUpdate.cancel();
  }, [searchQuery, debouncedUpdate]);

  return { inputValue, setInputValue: handleChange };
}
