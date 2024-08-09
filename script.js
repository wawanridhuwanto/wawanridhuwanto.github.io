async function query(data) {
    const response = await fetch(
        "http://localhost:3000/api/v1/prediction/00c0f721-dadc-4a16-ad37-87b59c78df49",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({"question": "Hey, how are you?"}).then((response) => {
    console.log(response);
});
