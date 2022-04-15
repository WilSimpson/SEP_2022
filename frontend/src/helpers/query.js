import React from 'react';
import {useLocation} from 'react-router';

/**
 * Uses the current URL location to get a url search param
 * @return {URLSearchParams} url search param for the current url
 */
function useQuery() {
  const {search} = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export {useQuery};
