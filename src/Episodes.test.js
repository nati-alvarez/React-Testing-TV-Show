import React from "react";
import {render} from "@testing-library/react";

import Episodes from "./components/Episodes";

test("Checks if episodes component renders correctly with and without episode data", ()=>{
    const {queryAllByTestId, rerender} = render(<Episodes episodes={[]}/>);

    expect(queryAllByTestId("episode")).toHaveLength(0);

    const mockData = [
        {
            id: '1',
            name: "Episode 1"
        },
        {
            id: '2',
            name: "Episode 2"
        },
        {
            id: '3',
            name: "Episode 3"
        }
    ];

    rerender(<Episodes episodes={mockData}/>);
    expect(queryAllByTestId("episode")).toHaveLength(3);
});