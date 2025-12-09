import useFetch from "../useFetch";
import { useParams } from "react-router-dom";


export default function JobDetails(){
    const { id } = useParams();

    const { data: jobs, loading, error } = useFetch(`https://intern-house-backend-bice.vercel.app/jobs/${id}`);
    
    if(loading) return <p className="text-center mt-4">Loading...</p>
    if(error) return <p className="text-center mt-4">Error occurred while fetching data.</p>
    if (!jobs || !jobs.title) return <p className="text-center mt-4">No Job Found</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{jobs.title}</h2>
            <div className="card p-4 shadow-sm">
                <p><strong>Company Name: </strong> {jobs.companyName}</p>
                <p><strong>Location: </strong> {jobs.location}</p>
                <p><strong>Salary: </strong> {jobs.salary}</p>
                <p><strong>Job Type: </strong> {jobs.jobType}</p>
                <p><strong>Description: </strong> {jobs.description}</p>
                <p><strong>Qualifications: </strong></p>
                <ol>
                    {jobs.qualifications?.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}