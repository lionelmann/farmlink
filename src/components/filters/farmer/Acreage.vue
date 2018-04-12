<template>
    <div>
        <h6>Available Acreage</h6>
        <form action="#">
            <label class="container">1 acre or less
                <input type="checkbox" name="acreage" value="1 acre or less" checked="checked">
                <span class="checkmark"></span>
            </label>
            <label class="container">2-5 acres
                <input type="checkbox" name="acreage" value="1 acre or less">
                <span class="checkmark"></span>
            </label>
            <label class="container">5-10 acres
                <input type="checkbox" name="acreage" value="5-10 acres">
                <span class="checkmark"></span>
            </label>
            <label class="container">10-25 acres
                <input type="checkbox" name="acreage" value="10-25 acres">
                <span class="checkmark"></span>
            </label>
            <label class="container">25-50 acres
                <input type="checkbox" name="acreage" value="25-50 acres">
                <span class="checkmark"></span>
            </label>
            <label class="container">50 acres or more
                <input type="checkbox" name="acreage" value="50 acres or more">
                <span class="checkmark"></span>
            </label>
        </form>
    </div>
</template>

<script>
export default {
}
</script>