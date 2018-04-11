<template>
    <div>
        <h6>Farm Opportunity</h6>
        <form action="#">
            <label class="container">On-farm employment
                <input type="checkbox" name="opportunity" value="On-farm employment" checked="checked">
                <span class="checkmark"></span>
            </label>
            <label class="container">Mentoring
                <input type="checkbox" name="opportunity" value="Mentoring">
                <span class="checkmark"></span>
            </label>
            <label class="container">Internship
                <input type="checkbox" name="opportunity" value="Internship">
                <span class="checkmark"></span>
            </label>
            <label class="container">Business partnership with existing farmer
                <input type="checkbox" name="opportunity" value="Business partnership with existing farmer">
                <span class="checkmark"></span>
            </label>
            <label class="container">Business partnership with new farmer
                <input type="checkbox" name="opportunity" value="Business partnership with new farmer">
                <span class="checkmark"></span>
            </label>
            <label class="container">Lease
                <input type="checkbox" name="opportunity" value="Lease">
                <span class="checkmark"></span>
            </label>
                <label class="container">Lease-to-own
                <input type="checkbox" name="opportunity" value="Lease-to-own">
                <span class="checkmark"></span>
            </label>
            <div class="filter-apply-container">
                <span style="float: left"><a href="#">Clear</a></span>
                <span style="float: right"><a href="#">Apply</a></span> 
            </div>
        </form>
    </div>
</template>

<script>
export default {
}
</script>