<?php 

$hostname = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "sensor_db"; 

// Create MySQL connection
$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error()); 
}

echo "Database connection is OK<br>";

// Check if the required POST values are set and not empty
if (!empty($_POST['sensor1']) && !empty($_POST['sensor2']) && !empty($_POST['percentage3']) && !empty($_POST['percentage4'])) {
    $distanceWet = $_POST['sensor1'];
    $distanceDry = $_POST['sensor2'];
    $percentageWet = $_POST['percentage3'];
    $percentageDry = $_POST['percentage4'];

    // Insert the new values into the database
    $sql = "INSERT INTO sensor_dataa (distanceWet, distanceDry, percentageWet, percentageDry) 
            VALUES ('$distanceWet', '$distanceDry', '$percentageWet', '$percentageDry')";

    if ($conn->query($sql) === TRUE) {
        echo "Sensor values inserted into the MySQL database table.<br>";

        // Cleanup logic: Check the total number of rows
        $countQuery = "SELECT COUNT(*) AS total FROM sensor_dataa";
        $countResult = $conn->query($countQuery);
        $rowCount = $countResult->fetch_assoc()['total'];

        // If row count exceeds 20, delete the oldest rows
        if ($rowCount > 20) {
            // Fetch the IDs of the rows to delete
            $excessRows = $rowCount - 20;
            $fetchIdsQuery = "
                SELECT id FROM sensor_dataa
                ORDER BY timestamp ASC
                LIMIT $excessRows
            ";
            $idResult = $conn->query($fetchIdsQuery);

            if ($idResult->num_rows > 0) {
                $idsToDelete = [];
                while ($row = $idResult->fetch_assoc()) {
                    $idsToDelete[] = $row['id'];
                }

                // Convert IDs to a comma-separated string
                $idsString = implode(',', $idsToDelete);

                // Delete the rows with the fetched IDs
                $deleteQuery = "DELETE FROM sensor_dataa WHERE id IN ($idsString)";
                if ($conn->query($deleteQuery) === TRUE) {
                    echo "$excessRows old rows deleted to maintain table size.<br>";
                } else {
                    echo "Error deleting old rows: " . $conn->error . "<br>";
                }
            }
        }
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Incomplete data received. Ensure 'sensor1', 'sensor2', 'percentage3', and 'percentage4' are provided.";
}

// Close MySQL connection
$conn->close();

?>