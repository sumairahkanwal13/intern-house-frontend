import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const JobsList = () => {
    const { data: Job, loading, error } = useFetch("https://intern-house-backend-bice.vercel.app/jobs", []);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ jobList, setJobList ] = useState([]);
    

    useEffect(() => {
        if(Job.length > 0){
            setJobList(Job)
        }
    }, [Job])

    if(loading) return <p className="mt-4 text-center">Loading.....</p>
    if(error) return <p className="text-center mt-4">Error occurred while fetching data.</p>

    const filteredJobs = jobList.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const handleDelete = async (id) => {
        try{
           const res = await fetch(`https://intern-house-backend-bice.vercel.app/jobs/${id}`, {method: "DELETE"})

           if(res.ok){
            setJobList(prev => prev.filter((job) => job._id !== id))
            toast.success("Job deleted successfully!")
           }else{
            toast.error("Failed to delete job")
           }
            
        }catch (error){
            toast.error("Failed to delete job")
            console.error("Error deleting job ", error)

        }
    }
    
    return(
        <div className="container mt-4">
            <input
            type="text"
            placeholder="Search by job title..."
            className="form-control mb-4" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}/>

                <h2 className="mb-2">All Jobs</h2>
                <div className="row">
                    { filteredJobs.length === 0 ? (
                        <p className="text-center mt-4">No Job Found</p>
                    ) : (
                        filteredJobs.map((job) => (
                            <div className="col-md-4 mb-4" key={job._id}>
                                <div className="card p-3 shadow-sm">
                                    <h4>{job.title}</h4>
                                    <p><strong>Company name:</strong> {job.companyName}</p>
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Job Type:</strong> {job.jobType}</p>

                                    <div className="d-flex gap-2">
                                        <Link to={`/jobDetails/${job._id}`} className="btn btn-primary">See Details</Link>
                                        <button onClick={() => handleDelete(job._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
    )

}

export default JobsList