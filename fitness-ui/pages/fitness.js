import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [age, setAge] = useState();
  const [gender, setGender] = useState("male");
  const [currentWeight, setCurrentWeight] = useState();
  const [action, setAction] = useState("reduce");
  const [targetWeight, setTargetWeight] = useState();
  const [durationInMonths, setDurationInMonths] = useState();
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/fitness/fitness-advice?gender=${gender}&currentWeight=${currentWeight}&action=${action}&targetWeight=${targetWeight}&durationInMonths=${durationInMonths}&age=${age}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );
      console.log(`RESPONSE: ${JSON.stringify(response)}`);
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result.replaceAll("\n", "<br />"));
      setAge(0);
      setGender("");
      setCurrentWeight(0);
      setAction("");
      setTargetWeight(0);
      setDurationInMonths(0);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Fitness Adviser</title>
      </Head>

      <main className={styles.main}>
        <h3>Robo Fitness Adviser</h3>
        {!isLoading && !result && (
          <form onSubmit={onSubmit}>
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
            />
            <label>Gender</label>
            <select
              name="gender"
              placeholder="Enter your gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label>Current weight</label>
            <input
              type="number"
              name="currentWeight"
              placeholder="Enter your current weight"
              value={currentWeight}
              onChange={(e) =>
                setCurrentWeight(Number.parseInt(e.target.value))
              }
            />
            <label>What is your goal ?</label>
            <select
              name="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="reduce">Reduce weight</option>
              <option value="increase">Increase weight</option>
            </select>{" "}
            <label>Target weight</label>
            <input
              type="number"
              name="targetWeight"
              placeholder="Enter your target weight"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number.parseInt(e.target.value))}
            />
            <label>In what time frame you want to achieve the goal ?</label>
            <input
              type="number"
              name="durationInMonthsInput"
              placeholder="Enter your duration in months"
              value={durationInMonths}
              onChange={(e) =>
                setDurationInMonths(Number.parseInt(e.target.value))
              }
            />
            <input type="submit" value="Generate Fitness Plan" />
          </form>
        )}
        {isLoading && (
          <div>
            <h3>Make some moves while ChatGPT prepare your fitness plan</h3>
            <img src="/fitnessLoading.gif" className={styles.loading} />
          </div>
        )}

        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
