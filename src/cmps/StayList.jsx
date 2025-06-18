// src/cmps/StayList.jsx
import React from 'react'
import { StayCarousel } from './carousel/StayCarousel'
import { rightArrowSvg } from '../../data/svgExport'

export function StayList({ stays }) {
  const sections = [
    <>Popular homes in Eilat {rightArrowSvg}</>,
    <>Available in Tel Aviv-Yafo this weekend {rightArrowSvg}</>,
    <>Stay in Athens {rightArrowSvg}</>,
    <>Available in Jerusalem this weekend {rightArrowSvg}</>,
    <>Homes in Budapest {rightArrowSvg}</>,
    <>Available next month in Rome {rightArrowSvg}</>,
    <>Places to stay in Paris {rightArrowSvg}</>,
    <>Check out homes in Haifa {rightArrowSvg}</>,
    <>Popular homes in London {rightArrowSvg}</>,
    <>Stay in Madrid {rightArrowSvg}</>,
  ]

  return (
    <section className="explor-lists">
      {sections.map((title, idx) => (
        <StayCarousel key={idx} stays={stays} title={title} />
      ))}
    </section>
  )
}
