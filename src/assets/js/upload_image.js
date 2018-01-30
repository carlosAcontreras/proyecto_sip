const upload_image = () => {
    $('#upload_file').change(function(e) {
        addImage(e);
    });

    const addImage = (e) => {
        let file = e.target.files[0],
            imageType = /image.*/;

        if (!file.type.match(imageType))
            return;

        let reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    }

    const fileOnload = (e) => {
        let result = e.target.result;
        $('#imgSalida').attr("src", result);
    }

}