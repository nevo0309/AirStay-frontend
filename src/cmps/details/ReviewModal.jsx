
import { Stars } from "./DetailsReview"
import { format } from 'date-fns'
import { DetailsReviewSummary } from "./DetailsReviewSummary"
import { xSvg } from "../../../data/svgExport"

export function ReviewModal({ reviews, stay, setIsReviewModalOpen }) {

    return (
        <section className="review-modal-container">
            <div className="review-backdrop"></div>

            <div className="modal">
                <button className="close-btn" onClick={()=>setIsReviewModalOpen(false)}>{xSvg}</button>
                <div className="review-summary">
                    <DetailsReviewSummary stay={stay} />
                </div>

                <section className="details-reviews">
                    <div className="reviews flex column">
                        {reviews.map(rev => (
                            <article key={rev.at} className="review-card">
                                <div className="reviewer">
                                    <img src={rev.by.imgUrl} alt={rev.by.fullname} className="reviewer-avatar" />
                                    <div className="reviewer-info">
                                        <h4 className="reviewer-name">{rev.by.fullname}</h4>
                                        {rev.by.location && <p className="reviewer-location">{rev.by.location}</p>}
                                    </div>
                                </div>

                                <div className="review-meta">
                                    <Stars count={rev.stars} />
                                    <span className="review-date">· {format(new Date(rev.at), 'MMMM yyyy')}</span>
                                    <span className="review-duration">· Stayed one night</span>
                                </div>

                                <p className="review-text">{rev.txt}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </section>

    )
}