import React from 'react';
import { mount, shallow } from 'enzyme';
import StartingSurvey from '../components/startingSurvey';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

describe("<StartingSurvey />", () => {
    let wrapper;
    it ("should render the StartingSurvey component", () => {
        wrapper = shallow(<BrowserRouter>
            <Routes>   
                <Route path="*" element= {<StartingSurvey />}/>
            </Routes>
        </BrowserRouter>);
    });


    it ('should require a team name', () => {
        const { getByTestId } = render(<BrowserRouter>
            <Routes>   
                <Route path="*" element= {<StartingSurvey />}/>
            </Routes>
        </BrowserRouter>);
        const submit =  document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);
        expect(submit).toBeInTheDocument();
    });

    it ('should require a team size', () => {
        const { getByTestId } = render(<BrowserRouter>
            <Routes>   
                <Route path="*" element= {<StartingSurvey />}/>
            </Routes>
        </BrowserRouter>);
        const submit =  document.querySelector("[data-testid=submit]");
        const teamBox = getByTestId("name")

        expect(submit).toBeInTheDocument();
        expect(teamBox).toBeInTheDocument();
        fireEvent.change(teamBox, { target: { value: "Team Name" } })
        fireEvent.click(submit);
        expect(teamBox.value).toBe("Team Name");
        expect(submit).toBeInTheDocument();
    });
});