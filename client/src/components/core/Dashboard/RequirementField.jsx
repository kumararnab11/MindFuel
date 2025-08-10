import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
  const [requirement, setRequirement] = useState("")
  const [requirementList, setRequirementList] = useState([])
  const { editCourse, course } = useSelector((state) => state.course)

  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions||[])
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
  }, [])

  useEffect(() => {
    setValue(name, requirementList)
  }, [requirementList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList]
    updatedRequirementList.splice(index, 1)
    setRequirementList(updatedRequirementList)
  }

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full h-[35px] border border-gray-300 rounded-md my-1 bg-richblack-700"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-300"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span>
          {label} is required
        </span>
      )}
    </div>
  )
}

export default RequirementField